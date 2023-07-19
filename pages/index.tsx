import React, { useState } from "react";
import { IWeb3Context, useWeb3Context } from "../components/web3/Web3Context";
import { useEffect } from "react";
import { Property } from "../components/model/Property";

const App: React.FC = () => {
  const {
    state: { contract },
  } = useWeb3Context() as IWeb3Context;
  const [properties, setProperties] = useState<Array<Property> | null>([]);

  useEffect(() => {
    const getProperties = async () => {
      const properties: Array<Property> = await contract.getRegisteredProperties();
      setProperties(properties);

    };
    if (contract) {
      getProperties();
    }
  });

  return (
    <div>
      {properties?.map((p) => (
        <p key={p.id}>
          {p.id.toString()}
          {p.postalAddress} {p.description} {p.landlord.name}{" "}
          {p.price.toString()}
        </p>
      ))}
    </div>
  );
};

export default App;
