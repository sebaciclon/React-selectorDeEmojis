import styles from "./EmojiPicker.module.scss";

export default function EmojiButton({emoji, onClick}) {
    function handleClick() {
        onClick(emoji);
    }

    return (
        <button className={styles.emojiButton} onClick={handleClick}>{emoji.Symbol}</button>
    );
}