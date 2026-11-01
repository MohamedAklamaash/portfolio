import ProfilePage from "@/components/profile-page";
import { PROFILES } from "@/content/profiles";

export default function SoftwarePage() {
  return <ProfilePage profile={PROFILES.software} />;
}
