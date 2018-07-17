/**
 * @desc dataURI to blob, ref to https://gist.github.com/fupslot/5015897
 * @param dataURI
 * @return {Blob} 
 */
function dataURItoBlob(dataURI) {
    let byteStr;
    let intArray;
    let ab;
    let i;
    let mimeType;
    let parts;

    parts = dataURI.split(',');
    parts[1] = parts[1].replace(/\s/g, '');

    if (~parts[0].indexOf('base64')) {
        byteStr = atob(parts[1]);
    } else {
        byteStr = decodeURIComponent(parts[1]);
    }

    ab = new ArrayBuffer(byteStr.length);
    intArray = new Uint8Array(ab);

    for (i = 0; i < byteStr.length; i++) {
        intArray[i] = byteStr.charCodeAt(i);
    }

    mimeType = parts[0].split(':')[1].split(';')[0];

    return newBlob(ab, mimeType);
}

function newBlob(data, datatype) {
    let out;
    try {
        out = new Blob([data], {type: datatype});
    } catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;

        if (e.name == 'TypeError' && window.BlobBuilder) {
            let bb = new window.BlobBuilder();
            bb.append(data);
            out = bb.getBlob(datatype);
        } else if (e.name == 'InvalidStateError') {
            out = new Blob([data], {type: datatype});
        } else {
            return null;
        }
    }
    return out;
}


// compress(originFile, {
    // compress: {
    //     width: 1600,
    //     height: 1600,
    //     quality: 0.8,
    //     maxSize: maxSize * 1024
    // },
    // type: 'file',
// });

/**
 * @desc 压缩图片
 * @param file 文件对象
 * @param option {Object} 压缩参数
 * @param callback 压缩完成的回调
 */
function compress(file, options) {
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.onload = function (evt) {
            // if (options.compress === false) {
            //     // 不启用压缩 & base64上传 的分支
            //     file.base64 = evt.target.result;
            //     resolve(file);
            //     return;
            // }
    
            // 启用压缩的分支
            const img = new Image();
            img.onload = async()=> {
                /*
                    将图片映射到canvas中，通过缩放canvas，
                    再将canvas 转化为blob，从而达到压缩图片的效果。
                */
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
    
                const maxW = options.width;
                const maxH = options.height;
                // let w = img.width;
                // let h = img.height;
                // let dataURL;
    
                // if (w < h && h > maxH) {
                //     w = parseInt(maxH * img.width / img.height);
                //     h = maxH;
                // } else if (w >= h && w > maxW) {
                //     h = parseInt(maxW * img.height / img.width);
                //     w = maxW;
                // }
    
                canvas.width = w;
                canvas.height = h;
    
                ctx.drawImage(img, 0, 0, w, h);
    
                if (/image\/jpeg/.test(file.type) || /image\/jpg/.test(file.type)) {
                    dataURL = canvas.toDataURL('image/jpeg', options.quality);
                } else {
                    dataURL = canvas.toDataURL(file.type);
                }
                if (options.type == 'file') {
                    if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
                        // 压缩出错，以文件方式上传的，采用原文件上传
                        console.warn('Compress fail, dataURL is ' + dataURL + '. Next will use origin file to upload.');
                        reject("压缩出错，请采用原文件上传");
                    } else {
                        let blob = dataURItoBlob(dataURL);
                        if (blob) {
                            // 如果设置了maxSize, 递归压缩到够小为止
                            if (options.maxSize && blob.size > options.maxSize) {
                                options.width -= 500;
                                options.height -= 500;
                                options.quality -= 0.3;
                                let compressedBlob = await compress(blob, options);
                                resolve(compressedBlob);
                            }
                            blob.id = file.id;
                            blob.name = file.name;
                            blob.lastModified = file.lastModified;
                            blob.lastModifiedDate = file.lastModifiedDate;
                            resolve(blob);
                        } else {
                            reject("压缩出错");
                        }
                    }
                } else {
                    if (/;base64,null/.test(dataURL) || /;base64,$/.test(dataURL)) {
                        // 压缩失败，以base64上传的，直接报错不上传
                        // options.onError(file, new Error('Compress fail, dataURL is ' + dataURL + '.'));
                        reject();
                    } else {
                        file.base64 = dataURL;
                        reject(file);
                    }
                }
            };
            img.src = evt.target.result;
        };
        // 解决iOS通过摄像头上传图片方向错误的问题
        reader.readAsDataURL(file);
    });





}
module.exports = {
    dataURItoBlob,
    compress
};