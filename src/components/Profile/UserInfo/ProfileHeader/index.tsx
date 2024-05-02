import Image from "next/image";

export default function ProfileHeader({ username }: { username: string }) {
  return (
    <>
      <Image
        src="http://i.imgur.com/Qr71crq.jpg"
        className="user-img"
        width={100}
        height={100}
        alt=""
      />
      <h4>{username}</h4>
      <p>
        Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks
        like Peeta from the Hunger Games
      </p>
    </>
  );
}
