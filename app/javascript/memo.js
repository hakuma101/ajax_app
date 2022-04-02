const buildHTML = (XHR) => {   //HTMLの生成は処理の本質部分ではないため、投稿したメモのHTMLを生成する部分を関数buildHTMLとして、外に切り出し
  const item = XHR.response.post;   //XHR.response.postと記述することで、レスポンスの中から投稿されたメモの情報を抽出し、変数itemに格納
      const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const submit = document.getElementById("submit");   //JavaScriptで値を取得、getElementByIdメソッドで取得した投稿ボタンの要素を変数submitに格納
  submit.addEventListener("click", (e) => {   //addEventListenerメソッドの第一引数にはclickイベントを指定、第二引数に実行したい処理を記述
    e.preventDefault();   //addEventListener第二引数の関数の引数をeに指定,preventDefault()の対象をeとすることにより、「投稿ボタンをクリックした」という現象を無効化
    const form = document.getElementById("form");   //getElementByIdメソッドを用いて、フォームの要素を取得、getElementByIdメソッドで取得したフォームの要素を変数formに格納
    const formData = new FormData(form);   //FormDataオブジェクトを使って、フォームの値を取得、新たに生成したFormDataオブジェクトを変数formDataに格納
    const XHR = new XMLHttpRequest();   //非同期通信を行うためにXMLHttpRequestオブジェクトを生成、新たに生成したXMLHttpRequestオブジェクトを変数XHRに格納
    XHR.open("POST", "/posts", true);   //第一引数にはHTTPメソッド、第二引数にはパス、第三引数には非同期通信であるかをtrueかfalseで記述、投稿したメモをデータベースに保存したいので、HTTPメソッドにはPOSTを指定
    XHR.responseType = "json";   //レスポンスのデータを「JSON形式」で返して欲しいため、データフォーマットを「JSON」に指定
    XHR.send(formData);  //send()メソッドでフォームに入力された内容をサーバー側に送信
    XHR.onload = () => {   //onloadプロパティを用いて、レスポンスの受信に成功したときの処理を記述
      if (XHR.status != 200) {   //XHR.statusには、HTTPステータスコードが格納
        alert(`Error ${XHR.status}: ${XHR.statusText}`);   //XHR.statusTextには、ステータスコードに応じたメッセージが格納
        return null;   //return null;によってJavaScriptの処理から抜け出す、エラーが出た場合に以降に記述されている処理を行わないようにする
      };
      const list = document.getElementById("list");   //新しいメモを挿入するための要素を取得して、変数listに格納
      const formText = document.getElementById("content");   //リセットの対象となるフォームの要素contentを取得して、変数formTextに格納
      list.insertAdjacentHTML("afterend", buildHTML(XHR));   //insertAdjacentHTMLメソッドの第一引数にafterendを指定することで、変数listに格納された要素の直後に生成したHTMLを挿入
      formText.value = "";   //formTextのvalue属性に空の文字列を指定することで、フォームの中身をリセット
    };
  });
 };
 
 window.addEventListener('load', post);   //addEventListenerメソッドの第一引数にはloadイベントを指定し、第二引数の中に実行したい処理を記述