// fucking simple unique ids
var id = 256;
function createUid() {
	return id++;
}

module.exports = createUid;
