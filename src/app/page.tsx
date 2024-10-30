import DataInputForm from "@/components/DataInputForm/DataInputForm";
import Protected from "@/lib/Providers/Protected";

const MainPage = async () => {
  return (
    <div>
      <Protected>
        <DataInputForm />
      </Protected>
    </div>
  );
};

export default MainPage;
