import SlideUpWhenVisible from "@/components/slide-up-when-visible";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SOCIALS } from "@/lib/constants";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { MailIcon } from "lucide-react";

const ContactSection = () => {
  return (
    <div className="py-24 px-4 text-center">
      <SlideUpWhenVisible>
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          Whether you have a question, a project opportunity, or just want to say
          hi, feel free to drop me a message. I&apos;ll try my best to get back to
          you!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={SOCIALS.email} target="_blank">
                <Button size="lg" className="gap-2 rounded-full px-8">
                    <MailIcon className="w-4 h-4" />
                    Say Hello
                </Button>
            </Link>
        </div>

        <div className="mt-12 flex justify-center gap-6 text-gray-400">
            <Link href={SOCIALS.github} target="_blank" className="hover:text-white transition-colors">
                <SiGithub className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
            </Link>
            <Link href={SOCIALS.linkedin} target="_blank" className="hover:text-white transition-colors">
                <SiLinkedin className="w-6 h-6" />
                 <span className="sr-only">LinkedIn</span>
            </Link>
        </div>
      </SlideUpWhenVisible>
    </div>
  );
};

export default ContactSection;

