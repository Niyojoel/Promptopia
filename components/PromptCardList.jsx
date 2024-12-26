
const PromptCardList = ({data, handleTagClick})=> {
  return (
    <div className="prompt_layout mt-16">
      {data?.map(post => post && (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick}/> //_id
      ))}
    </div>
  )
}