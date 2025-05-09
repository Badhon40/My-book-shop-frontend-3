

export default function BookLoader() {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-300 bg-opacity-80 backdrop-blur-md">
            <div className="flex flex-col items-center">
            <svg
                    width="120"
                    height="120"
                    viewBox="0 0 120 120"
                    xmlns="http://www.w3.org/2000/svg">
                    <polygon points="60,30 90,90 30,90">
                        <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 60 70"
                        to="360 60 70"
                        dur="10s"
                        repeatCount="indefinite" />
                    </polygon>
                    </svg>



        {/* Loading Text */}
        <p className="mt-6 text-xl font-semibold text-gray-700">
          Loading Books...
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Your next favorite read is on its way!
        </p>
      </div>
    </div>
  );
}
