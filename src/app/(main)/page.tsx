import DataInputForm from "@/components/DataInputForm/DataInputForm";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const MainPage = () => {
  return (
    <div className={poppins.className}>
      <DataInputForm />
    </div>
  );
};

export default MainPage;
