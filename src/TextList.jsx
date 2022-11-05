const React = require('react');
const application = require("application");
const clipboard = require("clipboard");

const TextNode = ({node}) => {
  const [value, setValue] = React.useState(node.text);
  const textAreaRef = React.useRef(null);
  
  /**
   * テキストエリアの値の更新
   */
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  /**
   * テキストのコピー
   */
  const copyHandler = () => {
    // 改行コードを<br>タグに置換
    const text = value.replace(/\n/g, '<br>');
    
    // クリップボードにコピー
    clipboard.copyText(text);
  }
  
  /**
   * テキストのペースト
   */
  const pasteHandler = () => {
    // テキストを上書き
    application.editDocument(() => {
      node.updateText(value);
    })
  }
  
  /**
   * テキストエリアの高さを更新
   */
  // const resizeTextArea = () => {
  //   textAreaRef.current.style.height = "auto";
  //   textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
  // }

  // React.useEffect(resizeTextArea, [value]);
  React.useEffect(() => {setValue(node.text)}, [node]);
  
  return (
    <div style={{marginBottom: '20px'}}>
      <div style={{marginBottom: '12px'}}>
        <div 
          className="spectrum-Textfield spectrum-Textfield--multiline"
          style={{
            width: '100%',
          }}
        >
          <textarea 
            name="field" 
            className="spectrum-Textfield-input" 
            value={value}
            onChange={handleChange}
            ref={textAreaRef}
            rows="1" />
        </div>
      </div>
      
      <div className="spectrum-ButtonGroup ">
        <a onClick={copyHandler} className="spectrum-Button spectrum-Button--fill spectrum-Button--secondary spectrum-Button--sizeS spectrum-ButtonGroup-item" style={{marginRight: '4px'}}>
          <span className="spectrum-Button-label">Copy</span>
        </a>
        
        <a onClick={pasteHandler} className="spectrum-Button spectrum-Button--fill spectrum-Button--secondary spectrum-Button--sizeS spectrum-ButtonGroup-item">
          <span className="spectrum-Button-label">Paste</span>
        </a>
      </div>
    </div>
  )
}

const TextList = ({textNodes}) => {
  // console.log('textNodes', textNodes);
  
  return (
    <div className='spectrum spectrum--light spectrum--medium'>
      <div>
        {textNodes.reverse().map((textNode, index) => (
          <TextNode key={index} node={textNode} />
        ))}
      </div>
    </div>
  )
}

module.exports = TextList;