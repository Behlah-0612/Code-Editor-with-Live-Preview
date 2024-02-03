//Catching the common queries to reduce dom queries

const livePreview = document.getElementById('live-preview');
const html = document.getElementById('html');
const css = document.getElementById('css');
const js = document.getElementById('js');

//Live preview set up function
function initLivePreview() {
    livePreview.contentWindow.document.body.innerHTML = '';
    const style = document.createElement('style');
    style.setAttribute('id', 'live-preview-style');
    livePreview.contentWindow.document.head.appendChild(style);

    const pageJavascript = document.createElement('script');
    pageJavascript.src = 'https://unpkg.com/dist/paged.legacy.polyfill.js';
    livePreview.contentWindow.document.body.appendChild(pageJavascript);
}

//Update Live preview function for HTML
function updateLivePreviewHTML(code) {
    livePreview.contentWindow.document.body.innerHTML = code.html.getValue();
}

//Update Live preview function for CSS
function updateLivePreviewCSS(code) {
    livePreview.contentWindow.document.getElementById('live-preview-style').innerHTML = code.css.getValue();
}

//Update Live preview function for JS
function updateLivePreviewJS(code) {
    const scriptElement = livePreview.contentWindow.document.createElement('script');
    scriptElement.innerHTML = code.js.getValue();
    livePreview.contentWindow.document.body.appendChild(scriptElement);
}

//Code Mirror setup
function initCodeMirror() {
    function getDefaultOpt(object){
            const DefaultOption = {
                lineNumbers: true,
                autoCloseTags: true,
                autoCloseBrackets: true,
                theme : 'panda-syntax'
            };
            if(object){
                const keys = Object.keys(object);
                for(const key of keys ){
                    DefaultOption[key] = object[key];
                }
            }
            return DefaultOption;
    }   

    const code ={
        html: CodeMirror(html, getDefaultOpt({
            mode: 'text/html',
            value: '',
        })),

        css: CodeMirror(css, getDefaultOpt({
            mode: 'css',
            value: '',
            extraKeys: {'Ctrl-Space': 'autocomplete'},
            hintOptions: {
                completeSingle:false,
                closeOnUnfocus:false
            }
        })),

        js: CodeMirror(js, getDefaultOpt({
            mode: 'javascript',
            value: '',
        }))

    }
    return code;
}

function setupLivePreview() {
    const codeEditor = initCodeMirror();

    //Event listeners for code changes
    CodeMirror.on(codeEditor.html, 'change', () => {
        updateLivePreviewHTML(codeEditor);
    })

    CodeMirror.on(codeEditor.css, 'change', () => {
        updateLivePreviewCSS(codeEditor);
    })

    CodeMirror.on(codeEditor.js, 'change', () => {
        updateLivePreviewJS(codeEditor);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initLivePreview();
    setupLivePreview();
});