import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import NewMeetUpForm from "../../components/meetups/NewMeetupForm";
//our-domain.com/new-meetup

function NewMeetUpPage() {
  const router = useRouter();

  async function addMeetUpHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);

    window.location.href = "/";
  }
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta
          name="description"
          content="Add a new meetup and expand your newtworking!"
        />
      </Head>
      <NewMeetUpForm onAddMeetup={addMeetUpHandler} />
    </Fragment>
  );
}
export default NewMeetUpPage;
