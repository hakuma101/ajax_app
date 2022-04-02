class PostsController < ApplicationController

  def index
    @posts = Post.order(id: "DESC")
  end

  # コメントアウトする
  # def new
  # end

  def create
    post = Post.create(content: params[:content])   # 新たに投稿されたメモの内容を変数postに格納
    render json:{ post: post }   # renderメソッドを用いて、レスポンスで返却されるデータフォーマットにJSONを指定
  end
end
