import Head from "next/head";
import { Fragment } from "react";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getServerSideProp() {
  //fetch data from an API

  const client = await MongoClient.connect(
    "mongodb://reeyahtt:reeyahtt@ac-a1dycsw-shard-00-00.9xjnmnw.mongodb.net:27017,ac-a1dycsw-shard-00-01.9xjnmnw.mongodb.net:27017,ac-a1dycsw-shard-00-02.9xjnmnw.mongodb.net:27017/?ssl=true&replicaSet=atlas-tp3k6w-shard-0&authSource=admin&appName=Cluster0",
  );
  const db = client.db("meetups");

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
