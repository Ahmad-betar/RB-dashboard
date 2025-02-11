const Title = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center p-2 w-fit mx-auto text-2xl border-b border-black">
      {title}
    </div>
  );
};

export default Title;
