import Feed from "@components/Feed"
import {banner} from "@data/content" 

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <div>
            <h1 className="md:w-full w-[85%] mx-auto head_text text-center">
                {banner.header[0]}
                <br />
                <span className="orange_gradient text-center">
                    {banner.header[1]}
                </span>
            </h1>
            <p className="desc text-center">
                {banner.description}
            </p>
        </div>
        <Feed/>
    </section>
  )
}

export default Home