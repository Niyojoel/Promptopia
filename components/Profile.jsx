import PromptCard from "./PromptCard"
import PromptCardList from "./PromptCardList"

const Profile = ({name, desc, handleEdit, handleDelete}) => {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {name} Profile
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <PromptCardList margin={"10"} handleEdit={handleEdit} handleDelete={handleDelete} />
    </section>
  )
}

export default Profile