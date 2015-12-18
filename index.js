var fs = require('fs');

function ConcatenateBrunch(config) {
    this.config = config;
    if (config && config.plugins && config.plugins.concatenate) {
        this.files = config.plugins.concatenate.files || {};
    } else {
        this.files = {};
    }
}

ConcatenateBrunch.prototype.brunchPlugin = true;

ConcatenateBrunch.prototype.onCompile = function onCompile(generatedFiles) {
    // Key is the destination file
    for (var destPath in this.files) {
        // Read the sources and whether to remove old files
        var options = this.files[destPath];
        // Skip if we only want this to apply in production
        if (options.productionOnly && this.config.env.indexOf('production') === -1) {
            continue;
        }
        // Create temporary destination file
        var randSfx  = Math.floor(Math.random() * 1024);
        var tempPath = '/tmp/concatenate_brunch_' + randSfx;
        // Make sure the file is empty
        if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
        }
        if (options.type === 'json') {
            fs.appendFileSync(tempPath, '[\n');
        }
        // Read sources one-by-one sequentially
        for (var i = 0; i < options.sources.length; i++) {
            var source = options.sources[i];
            // Write them synchronously as Brunch doesn't support callbacks for
            // `onCompile(1)` yet. See https://github.com/brunch/brunch/issues/749
            fs.appendFileSync(tempPath, fs.readFileSync(source));
            if (options.type === 'json' && (i !== options.sources.length - 1)) {
                fs.appendFileSync(tempPath, ',\n');
            }
            // Remove the file is desired
            if (options.toRemove) {
                fs.unlinkSync(source);
            }
        }
        if (options.type === 'json') {
            fs.appendFileSync(tempPath, ']');
        }
        // Move the temp file to the destination
        fs.renameSync(tempPath, destPath);
    }

    return;
};

module.exports = ConcatenateBrunch;
