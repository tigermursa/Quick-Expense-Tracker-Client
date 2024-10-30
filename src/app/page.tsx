import DataInputForm from "@/components/DataInputForm/DataInputForm";
import { cookies } from "next/headers";
const MainPage = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken");

  console.log("mytocken", token?.name);

  return (
    <div>
      <DataInputForm />
    </div>
  );
};

export default MainPage;
