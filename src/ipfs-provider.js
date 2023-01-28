import { createContext, useContext, useEffect, useState } from "react";

import useIpfsFactory from "./hooks/use-ipfs-factory.js";

export const IPFSContext = createContext();
export const useIPFSContext = () => useContext(IPFSContext);

// simpleIPFS is a simple k/v interface to hide the complexity of IPFS
const simpleIPFS = (ipfsClient) => {
  return {
    get: async (cid) => {
      let chunks = [];
      for await (const chunk of ipfsClient.cat(cid)) {
        chunks.push(chunk);
      }

      return chunks.toString();
    },
    set: async (data) => {
      return ipfsClient.add(data);
    },
    info: async () => {
      const versionResp = await ipfsClient.version();
      const idResp = await ipfsClient.id();

      return {
        id: idResp.id.string,
        version: versionResp.version,
        agentVersion: idResp.agentVersion,
      };
    },
  };
};

export const IPFSProvider = ({ children }) => {
  const { ipfsClient, ipfsInitError } = useIpfsFactory({ commands: ["id"] });
  const [ipfs, setIPFS] = useState();

  useEffect(() => {
    if (!ipfsClient) return;
    setIPFS(simpleIPFS(ipfsClient));
  }, [ipfsClient]);

  return (
    <IPFSContext.Provider value={{ ipfs }}>{children}</IPFSContext.Provider>
  );
};
