export const FeaturesSection = () => {
  return (
    <section className="px-6 py-16 bg-white">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Flexible Boards</h3>
          <p className="text-gray-600">
            Organize your tasks your way with customizable boards.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">
            Real-time Collaboration
          </h3>
          <p className="text-gray-600">
            Work together with your team seamlessly.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>
          <p className="text-gray-600">
            Keep track of progress with smart insights and statuses.
          </p>
        </div>
      </div>
    </section>
  );
};
