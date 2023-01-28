import { useEffect, useState } from "react";
import { useIPFSContext } from "../ipfs-provider.js";

export const IPFSMetadata = (props) => {
  const { ipfs } = useIPFSContext();
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    if (!ipfs) return;

    const getMetadata = async () => {
      const info = await ipfs.info();
      setMetadata(info);
    };

    getMetadata();
  }, [ipfs]);

  return (
    <section>
      {metadata && (
        <>
          <div>
            id: <span>{metadata.id}</span>
          </div>
          <div>
            version: <span>{metadata.version}</span>
          </div>
          <div>
            agentVersion: <span>{metadata.agentVersion}</span>
          </div>
        </>
      )}
    </section>
  );
};
