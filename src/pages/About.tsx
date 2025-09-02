// AboutPage.tsx
import React from "react";
import user  from '@/assets/images/user.jpg'
import mission from '@/assets/images/mission.png'


interface TeamMember {
  name: string;
  role: string;
  image: string;
  social?: { github?: string; linkedin?: string };
}

const teamMembers: TeamMember[] = [
  { name: "Alice Johnson", role: "CEO", image: user, social: { linkedin: "https://linkedin.com/in/alice" } },
  { name: "Bob Smith", role: "CTO", image: user, social: { github: "https://github.com/bobsmith" } },
  { name: "Carol Lee", role: "Operations Manager", image: user },
];

const AboutPage: React.FC = () => {
  return (
    <div className="text-gray-900 dark:text-gray-100">

      <section className="relative h-96 flex items-center justify-center text-center px-4">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold uppercase">
            <span className="text-primary">Delivering Parcels</span> 
            <br/> 
            <span className="text-orange-400">Connecting People</span>
          </h1>
          <p className="text-lg drop-shadow-md">
            Fast, secure, and reliable parcel delivery services. Track every delivery and stay assured that your parcels reach on time.
          </p>
        </div>
      </section>

      <section className="py-24 space-y-16 bg-blue-50 dark:bg-black">
        <div className="px-4 max-w-6xl mx-auto  grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-center text-orange-500 dark:text-orange-400">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              We simplify parcel delivery for everyone. Our system ensures efficiency, transparency, and security
              in every shipment, empowering businesses and individuals alike.
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>🚀 Fast and reliable deliveries</li>
              <li>🔒 Secure handling of parcels</li>
              <li>📍 Real-time tracking and updates</li>
            </ul>
          </div>
          <div>
            <img
              src={mission}
              alt="Mission illustration"
              className="rounded-xl shadow-lg hover:scale-105 transform transition-transform"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <h2 className="text-4xl font-bold text-center text-orange-400">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-orange-500 dark:ring-orange-400">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-300 mb-4">{member.role}</p>
                <div className="flex space-x-4">
                  {member.social?.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      GitHub
                    </a>
                  )}
                  {member.social?.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-20 pb-24 bg-blue-50 dark:bg-black">
        <h2 className="pb-8 text-4xl font-bold text-center text-orange-400">Our Services</h2>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="bg-gradient-to-tr from-blue-500 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 p-10 rounded-3xl shadow-xl text-white hover:scale-105 transform transition-transform">
            <h3 className="text-2xl font-semibold mb-2">Fast Delivery</h3>
            <p>Reliable delivery across cities with speed and efficiency.</p>
          </div>
          <div className="bg-gradient-to-tr from-green-400 to-teal-500 dark:from-green-700 dark:to-teal-900 p-10 rounded-3xl shadow-xl text-white hover:scale-105 transform transition-transform">
            <h3 className="text-2xl font-semibold mb-2">Secure Handling</h3>
            <p>Your parcels are safe and monitored during the entire journey.</p>
          </div>
          <div className="bg-gradient-to-tr from-purple-500 to-orange-500 dark:from-purple-700 dark:to-orange-900 p-10 rounded-3xl shadow-xl text-white hover:scale-105 transform transition-transform">
            <h3 className="text-2xl font-semibold mb-2">Real-Time Tracking</h3>
            <p>Track your parcels in real-time from pickup to delivery.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
