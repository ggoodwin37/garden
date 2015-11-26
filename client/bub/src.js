// represents a bub spawner. It has a concept of location (which can be updated), and possibly additional state.
// since this is a visual effect that is typically tied to a game object, this will just have position, not velocity.
// it can update its position to lock on to a game object (which itself may have velocity).
function BubSrc() {
}

module.exports = BubSrc;
