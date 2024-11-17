import { ITeamLinks } from '@/types/types'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

export default function TeamLinks({ link_instagram, link_twitter, link_facebook }: ITeamLinks) {
  return (
    <div className='flex justify-center items-center gap-5'>
      {link_instagram && (
        <a 
          href={link_instagram} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit LinkedIn profile"
          className="social-link"
        >
          <Linkedin color="#0a66c2" />
          <span className="sr-only">LinkedIn</span>
        </a>
      )}
      
      {link_facebook && (
        <a 
          href={link_facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit Facebook profile"
          className="social-link"
        >
          <Facebook color="#1877F2" />
          <span className="sr-only">Facebook</span>
        </a>
      )}

      {link_twitter && (
        <a 
          href={link_twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit Twitter profile"
          className="social-link"
        >
          <Twitter color="#1da1f2" />
          <span className="sr-only">Twitter</span>
        </a>
      )}
    </div>
  )
}
