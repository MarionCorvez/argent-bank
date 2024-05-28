import datas from "@data/transactions.json";
import Account from "@components/Account";
import Transactions from "@components/Transactions";

export default function Profile() {
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
