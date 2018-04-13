function init_framework(productive) {
    console.log("init_framework ---> " + productive ? "PRODUCTIVE" : "DEVELOP")
    window.frutils = new FRUTILS(productive);
}
init_framework(false);