const UiHelpers = {
	makeHumanReadable: ms => {
    let numMinutes = 0, numSeconds = 0;
    while (ms / 60000 >= 1) {
    	ms -= 60000;
    	numMinutes++;
    }
    numSeconds = (ms / 1000).toFixed().match(/.?.$/)[0];
    if (numSeconds.length === 1) {
    	numSeconds = '0' + numSeconds;
    }
    return `${numMinutes}:${numSeconds}`;
  }
};

module.exports = UiHelpers;