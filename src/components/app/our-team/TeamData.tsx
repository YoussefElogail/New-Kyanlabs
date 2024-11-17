import { getTeam } from '@/APIS/fetch-functions';
import SharedCard from '@/components/SharedCard'
import { ITeam } from '@/types/types';
import { cookies } from 'next/headers';
import React from 'react'

const TeamData = async () => {
    const cookieStore = cookies();
  const lang = cookieStore.get("NEXT_LOCALE");
    const teamData: ITeam[] = await getTeam(lang?.value);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
    {teamData?.map((person) => (
      <SharedCard
        key={person.id}
        cardType="team"
        image={person.image}
        email={person.email}
        link_facebook={person.link_facebook}
        link_instagram={person.link_instagram}
        link_linkedin={person.link_linkedin}
        link_twitter={person.link_twitter}
        name={person.name}
        position={person.position}
      />
    ))}
  </div>
  )
}

export default TeamData