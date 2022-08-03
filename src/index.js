const fs = require('fs'); 
const path = require('path'); 

class RemoveUniCdn {
    data() {
        return {
            'https://cdn.dcloud.net.cn/img/shadow-blue.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURb7T9ezy/MbY9t/p+tHg+Pf6/gmQWsMAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
            'https://cdn.dcloud.net.cn/img/shadow-green.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURb71vuz87Mb2xt/639H40ff+98iMtmEAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
            'https://cdn.dcloud.net.cn/img/shadow-grey.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURdnZ2fT09N7e3uzs7OTk5Pr6+vVa4lkAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
            'https://cdn.dcloud.net.cn/img/shadow-orange.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfXTvvzy7PbYxvrp3/jg0f7692in75UAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
            'https://cdn.dcloud.net.cn/img/shadow-red.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfW+yvzs7/bG0Prf5PjR2v73+TToEXgAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
            'https://cdn.dcloud.net.cn/img/shadow-yellow.png':
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAGBAMAAADwPukCAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAASUExURfXvvvz67Pbxxvr33/j00f7997nVB7sAAAAUSURBVAjXY2BgUGBwYDBgEGAIAAAEXADx8btKYQAAAABJRU5ErkJggg==',
        };
    }
    apply(compiler) {
        compiler.hooks.emit.tap('RemoveUniCdn', (compilation, params) => {
            for (var filename in compilation.assets) {
                if (filename.endsWith('.css')) {

                    let source = compilation.assets[filename].source();
                    let text = Buffer.isBuffer(source) ? source.toString() : source;

                    Object.keys(this.data()).map(key => {
                        text = text.replace(new RegExp(key, 'g'), this.data()[key]);
                    });

                    compilation.assets[filename] = {
                        source: () => text,
                        size: () => text.length,
                    };
                }
            }
        });
    }
}
module.exports = RemoveUniCdn;
