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
  });
 };
 
 window.addEventListener('load', post);   //addEventListenerメソッドの第一引数にはloadイベントを指定し、第二引数の中に実行したい処理を記述