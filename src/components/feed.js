import { useEffect, useState } from "react";
import { useIPFSContext } from "../ipfs-provider.js";
import { useNostrContext } from "../nostr-provider.js";
import "./feed.css";

export const Feed = (props) => {
  const { nostr } = useNostrContext();
  const { ipfs } = useIPFSContext();
  const [feed, setFeed] = useState([]);

  const reload = () => {
    const resolveNotesData = async (notes) => {
      await notes.forEach(async (note) => {
        note.data = await ipfs.get(note.cid);
      });

      setFeed(notes);
    };

    const notes = nostr.getFeed();
    resolveNotesData(notes);
  };

  useEffect(() => {
    if (!nostr || !ipfs) return;
    reload();
  }, [nostr, ipfs]);

  // TODO: This audio player does not work.
  // could be the data format going into or out of IPFS.
  // could be the usage of the audio element.
  const player = (note) => {
    //const src = `data:${note.filetype};base64,${note.data}`
    const src = note.data;
    return <audio controls src={src}></audio>;
  };

  return (
    <section>
      <h1>Feed</h1>
      <button onClick={reload}>reload</button>
      <div className="feed">
        {feed &&
          feed.map((item, i) => (
            <div className="post" key={i}>
              <h3>{item.text}</h3>
              {player(item)}
            </div>
          ))}
      </div>
    </section>
  );
};
