import { requireProfile } from "@/lib/auth";
import { updateProfile } from "@/lib/actions";

export default async function ProfilePage() {
  const { profile } = await requireProfile();

  return (
    <div>
      <h1 className="display text-3xl text-ink">Your profile</h1>
      <form
        action={async (fd) => {
          "use server";
          await updateProfile(fd);
        }}
        className="mt-6 max-w-xl space-y-3 border border-line bg-white p-6"
      >
        <input className="input" name="name" defaultValue={profile.name} required />
        <input className="input" name="title" defaultValue={profile.title ?? ""} placeholder="Title" />
        <input className="input" name="phone" defaultValue={profile.phone ?? ""} placeholder="Phone" />
        <input
          className="input"
          name="image_url"
          defaultValue={profile.image_url ?? ""}
          placeholder="Photo URL"
        />
        <textarea
          className="input min-h-28"
          name="bio"
          defaultValue={profile.bio ?? ""}
          placeholder="Bio"
        />
        <input
          className="input"
          name="password"
          type="password"
          placeholder="New password (optional, 8+ chars)"
        />
        <button type="submit" className="btn-primary">
          Save profile
        </button>
      </form>
    </div>
  );
}
