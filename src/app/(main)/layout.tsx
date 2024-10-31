import Navbar from "@/components/Navbar/Navbar";
import Protected from "@/lib/Providers/Protected";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Protected>
        <Navbar />
        {children}
      </Protected>
    </div>
  );
};

export default layout;
