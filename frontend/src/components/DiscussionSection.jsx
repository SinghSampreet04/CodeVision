function DiscussionSection({

    user,

    discussions,

    discussionText,

    setDiscussionText,

    handleDiscussionSubmit

}) {

    return (

        <>

            <hr />

            <h2>

                Discussions

            </h2>

            {

                user && (

                    <>

                        <textarea
                            rows={4}
                            cols={80}
                            value={discussionText}
                            onChange={(e) =>
                                setDiscussionText(
                                    e.target.value
                                )
                            }
                            placeholder="Write a comment..."
                        />

                        <br />

                        <br />

                        <button
                            onClick={
                                handleDiscussionSubmit
                            }
                        >

                            Post Comment

                        </button>

                        <br />

                        <br />

                    </>

                )

            }

            {

                discussions.length === 0 ? (

                    <p>

                        No discussions yet.

                    </p>

                ) : (

                    discussions.map(

                        discussion => (

                            <div
                                key={
                                    discussion.id
                                }
                            >

                                <strong>

                                    {
                                        discussion.username
                                    }

                                </strong>

                                <p>

                                    {
                                        discussion.content
                                    }

                                </p>

                                <small>

                                    {
                                        discussion.createdAt
                                    }

                                </small>

                                <hr />

                            </div>

                        )

                    )

                )

            }

        </>

    );

}

export default DiscussionSection;