import { useIPFSContext } from "../ipfs-provider.js";
import { useNostrContext } from "../nostr-provider.js";

export const Upload = (props) => {
  const { ipfs } = useIPFSContext();
  const { nostr } = useNostrContext();

  const upload = async (event) => {
    if (!ipfs) {
      alert("missing ipfs, cannot upload!");
      return;
    }
    if (!nostr) {
      alert("missing nostr, cannot upload!");
      return;
    }

    const file = event.target.files[0];

    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async function (e) {
      const data = e.target.result;

      // Upload to IPFS
      const filepath = await ipfs.set(data);
      console.log(filepath);

      // Publish to nostr
      const msg = {
        text: `new upload at ${Date()}`,
        cid: filepath.cid.toString(),
        filetype: file.type,
      };
      nostr.publish(msg);

      console.log(msg);

      // hack reload
      alert(
        "uploaded file to IPFS. Reload the page for it to show up in the feed"
      );
    };
  };

  return (
    <section>
      <label htmlFor="sample">Choose an audio file:</label>
      <input
        type="file"
        id="sample"
        name="sample"
        accept="*"
        onChange={upload}
      />
    </section>
  );
};
