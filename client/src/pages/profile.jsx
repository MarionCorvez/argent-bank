import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import datas from "@data/transactions.json";
import Account from "@components/Account";
import Transactions from "@components/Transactions";

export default function Profile() {
  const navigate = useNavigate();

  // Catch authSlice state
  const CurrentUser = useSelector((state) => state.auth);
  const isLoggedIn = CurrentUser.isLoggedIn;
  // console.log("isLoggedIn:", isLoggedIn);

  // Check connection status after component render
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <main className="main bg-dark">
        <Account />
        <h2 className="sr-only">Accounts</h2>
        {datas.map((data) => (
          <Transactions
            key={data.id}
            title={data.title}
            amount={data.amount}
            description={data.description}
          />
        ))}
      </main>
    </>
  );
}
