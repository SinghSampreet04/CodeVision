import { formatDateTime } from "../utils/format";

function DiscussionSection({

    user,

    discussions,

    discussionText,

    setDiscussionText,

    handleDiscussionSubmit

}) {

    return (

        <div className="discussion-card">

            <h2>

                Discussions

            </h2>

            {

                user && (

                    <>

                        <textarea

                            className="discussion-input"

                            aria-label="Discussion comment"

                            rows={4}

                            value={discussionText}

                            onChange={(e) =>

                                setDiscussionText(
                                    e.target.value
                                )

                            }

                            placeholder="Share your thoughts..."

                        />

                        <button

                            className="discussion-btn"

                            onClick={handleDiscussionSubmit}

                        >

                            Post Comment

                        </button>

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

                                key={discussion.id}

                                className="discussion-item"

                            >

                                <div className="discussion-user">

                                    {discussion.username}

                                </div>

                                <p>

                                    {discussion.content}

                                </p>

                                <small>
                                    <time dateTime={discussion.createdAt}>
                                        {formatDateTime(discussion.createdAt)}
                                    </time>
                                </small>

                            </div>

                        )

                    )

                )

            }

        </div>

    );

}

export default DiscussionSection;
