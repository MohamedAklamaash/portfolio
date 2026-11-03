---
title: Vercel-Style Deploys, Inside My Own AWS Account
description: I wanted push-to-deploy without handing my apps to someone else's platform. So I built a small one that runs in my own AWS account.
date: 2026-03-10
---

> [Launchpad](https://launchpad-five-lilac.vercel.app) takes a GitHub repository and runs it inside your own AWS account, with its own network, container cluster and load balancer. The code is [on GitHub](https://github.com/MohamedAklamaash/launchpad).

## Why I built it

Every time I deployed a side project, I had two options and didn't like either.

The first was a managed platform like Vercel, Railway or Render. The experience is great, but you pay extra for it, and things get awkward the moment you need something a little custom.

The second was doing it myself on AWS. That means setting up ECS, a load balancer, a container registry, security groups and IAM roles before a single line of the actual app runs. It easily takes half a day.

I wanted something in between: push your code and get a running app, but with everything living in my own AWS account. No shared servers, no markup on compute and full control when I need it. That's Launchpad.

## What it does

You give Launchpad an IAM role in your AWS account and point it at a GitHub repository. It does the rest.

First it sets up the environment with Terraform: a VPC with public and private subnets, a NAT gateway, an ECS cluster, an Application Load Balancer and an ECR registry. All of it is created in your account. Launchpad only controls things from outside. It never runs your code itself.

When you deploy an app, it goes through these steps:

1. Check that the infrastructure is up and the AWS credentials are still valid
2. Start a CodeBuild job in your account to build the Docker image
3. Push the image to your ECR registry
4. Create an ECS task definition with the CPU and memory you asked for
5. Add a target group and a load balancer rule so the app gets its own path
6. Start the ECS service and wait until it's healthy

All of this runs in the background. Deploy jobs go through Redis queues and the services talk to each other with RabbitMQ events, so the API replies straight away and you can watch the progress while it runs.

## What turned out to be harder than I expected

**Credentials that expire halfway through.** Launchpad uses `sts:AssumeRole` to get into your account, and those credentials last one hour. A long Terraform run or a slow ECS rollout can take longer than that. I had to add logic that notices when credentials have expired in the middle of a job and quietly gets fresh ones.

**A small race in the load balancer.** After creating a target group and attaching it to the load balancer, AWS doesn't always show the attachment straight away. Without a short wait and a check, about one in five deploys failed silently at the routing step.

**Docker Hub rate limits.** CodeBuild runs on AWS's shared IP addresses, and those hit Docker Hub's pull limits all the time. Switching the base images to ECR Public (`public.ecr.aws/docker/library/node:21-alpine` instead of `node:21-alpine`) made the errors go away completely.

**Fargate's fixed sizes.** Fargate only accepts certain CPU and memory pairs. You can't pass any number you like. I added a small function that rounds the user's choice to the nearest valid pair, which removed a whole class of confusing failures.

**Apps behind a path.** If `/my-app/*` is routed to a container, the container sees the full path, prefix included. Most apps aren't written for that. An NGINX sidecar now strips the prefix before passing the request on, so apps can keep their routes at `/` without knowing about the prefix.

## How it's put together

The backend is a set of Django services. One handles infrastructure: provisioning, Terraform state and AWS access. Another handles applications: deployments, build status and environment variables. A gateway handles login and routes requests to the right service. When an environment becomes ready, the infrastructure service sends an event and the application service picks up what it needs to start deploying.

The front end is React with TypeScript. Everything runs in Docker locally, and the only outside dependency is your AWS account.

## What I'd change

Routing every app under a path (`/app-name/*`) works, but it's not great for apps with client-side routing or assets at fixed paths. Proper custom domains with DNS and SSL would fix that, and it's next on the list.

Secrets are also basic for now. Environment variables are stored encrypted in the database. For anything serious, AWS Secrets Manager would be the better choice.

## Was it worth it?

Yes. I learnt more about how AWS actually behaves from this project than from anything else I've built. Knowing what ECS is and being able to set up a full ECS environment from code, with the right IAM, networking and routing, are very different things. Most of what I know now came from fixing the edge cases above one by one.

And I use it. Deploying a new project takes a few minutes now instead of an afternoon.
