// fucking simple unique ids
var id = 256;
function createUid() {
	console.log('handing out id=' + id);
	return id++;
}

module.exports = createUid;
