export default function GoalsMission() {
  return (
    <section className="bg-[#171719] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4">
          Simplify Your Society Life <span className="text-[#194BFD]">with Trusted Security and Reliable Services</span>
        </h2>

        {/* Goals Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mt-12">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src="/goals.jpg" // place your goals image in public folder
              alt="Goals Illustration"
              className="rounded-lg shadow-md w-full max-w-md object-cover"
            />
          </div>

          {/* Right - Goals Content */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center lg:text-left">
              Our Goals
            </h3>
            <ul className="space-y-4 text-[#e6e6e62c] leading-relaxed list-decimal list-inside">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad provident et natus quasi aliquid quia quisquam cupiditate totam.
              </li>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo obcaecati aspernatur similique, facilis omnis molestiae accusamus minima voluptatum odit mollitia!
              </li>
              <li>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam, deserunt.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi molestias id, iusto voluptas omnis fuga quasi?
              </li>
              <li>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, non?
              </li>
            </ul>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mt-20">
          {/* Left - Mission Content */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4 text-center lg:text-left">
              Our Mission
            </h3>
            <ul className="space-y-4 text-[#e6e6e62c] leading-relaxed list-decimal list-inside">
              <li>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas veritatis porro incidunt exercitationem veniam ex vitae animi dolorem quisquam quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis autem, ea illum quisquam incidunt libero explicabo suscipit vel soluta quae?
              </li>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis temporibus placeat eaque tenetur corporis asperiores accusantium aut voluptatibus minima rerum?
              </li>
              <li>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo veniam rem omnis et reiciendis pariatur sint esse reprehenderit inventore amet.
              </li>
            </ul>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center">
            <img
              src="/mission.jpg" // place your mission image in public folder
              alt="Mission Illustration"
              className="rounded-lg shadow-md w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
