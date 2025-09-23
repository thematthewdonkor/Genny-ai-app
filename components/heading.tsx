interface HeadingProps {
  title: string;
  subtitle: string;
}

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div>
      <div className="flex-1 mt-20">
        <div className="text-center mb-8">
          <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 text-balance">
            {title}
          </h1>
          <p className="md:text-xl text-gray-600 text-balance">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
