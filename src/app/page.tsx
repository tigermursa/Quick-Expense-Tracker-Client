import DataInputForm from "@/components/DataInputForm/DataInputForm";
import Navbar from "@/components/Navbar/Navbar";
import Protected from "@/lib/Providers/Protected";

const MainPage = () => {
  return (
    <div>
      <Protected>
        <Navbar />
        <DataInputForm />
      </Protected>
    </div>
  );
};

export default MainPage;
