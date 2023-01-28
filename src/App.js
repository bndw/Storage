import "./App.css";
import { Feed } from "./components/feed";
import { IPFSMetadata } from "./components/ipfs-metadata";
import { Upload } from "./components/upload";
import { IPFSProvider } from "./ipfs-provider";
import { NostrProvider } from "./nostr-provider";

function App() {
  return (
    <IPFSProvider>
      <NostrProvider>
        <IPFSMetadata />
        <Upload />
        <Feed />
      </NostrProvider>
    </IPFSProvider>
  );
}

export default App;
