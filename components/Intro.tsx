import Image from 'next/image';

const Intro = () => {
  return (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
        <h2>Hi there 👋</h2>
        <p>
          I'm a software engineer with a passion for building performant web
          apps using the latest web technologies. This is my space on the
          internet where I'll share my learnings. I am a work in progress so
          feel free to send me feedback on my learnings.
        </p>
      </div>
      <div className="sm:mx-auto lg:max-w-none lg:col-span-6 text-center">
        <Image
          src="/profile.png"
          alt="Handsome photo of Peter Mekhaeil on the Great Wall of China"
          width={500}
          height={500}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Intro;
