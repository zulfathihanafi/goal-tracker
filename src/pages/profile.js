

const profile = () => {
    return (
        <div>
            <div class="box">

                <input type="file" id="file" name="image" />
                <img src="" width="100%" height="100%" />
                <label for="file">Edit Picture</label>



                <input type="text" placeholder="User Name" name="" />
                <input type="Email" placeholder="Email ID" name="" />
                <input type="text" placeholder="Phone Number" name="" />
                <input type="text" placeholder="Date of Birth" name="" />
                <input type="password" placeholder="Password" name="" />

                <button class="delete" >Delete</button>

                <button class="done" >Done</button>

            </div>
        </div>
    );
}

export default profile;