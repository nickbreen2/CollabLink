import React from 'react'

interface IconProps {
  className?: string
}

// Map platform icon names to SVG file names in public/icons/
const iconFileMap: Record<string, string> = {
  TikTok: 'TikTok-preview.svg',
  Instagram: 'Instagram-preview.svg',
  YouTube: 'YouTube-preview.svg',
  Snapchat: 'Snapchat-preview.svg',
  Twitter: 'twitter-preview.svg',
  Discord: 'Discord-preview.svg',
  Threads: 'Threads-preview.svg',
  Reddit: 'Reddit-preview.svg',
  Facebook: 'Facebook-preview.svg',
  OnlyFans: 'OnlyFans-preview.svg',
  Clubhouse: 'Clubhouse-preview.svg',
  WhatsApp: 'WhatsApp-preview.svg',
  Telegram: 'Telegram-preview.svg',
  LinkedIn: 'LinkedIn-preview.svg',
  Skype: 'Skype-preview.svg',
  GitHub: 'GitHub-preview.svg',
  Calendly: 'Calendly-preview.svg',
  Spotify: 'Spotify-preview.svg',
  AppleMusic: 'Apple-Music-preview.svg',
  Soundcloud: 'Soundcloud-preview.svg',
  YoutubeMusic: 'Youtube-Music-preview.svg',
  AmazonMusic: 'Amazon-Music-preview.svg',
  Pandora: 'Pandora-preview.svg',
  PayPal: 'PayPal-preview.svg',
  Venmo: 'Venmo-preview.svg',
  CashApp: 'Cash-App-preview.svg',
  Zelle: 'Zelle-preview.svg',
  PlayStation: 'PlayStation-preview.svg',
  Xbox: 'Xbox-preview.svg',
  Steam: 'Steam-preview.svg',
  Twitch: 'Twitch-preview.svg',
  Kick: 'Kick-preview.svg',
  ApplePodcast: 'Apple-Podcast-preview.svg',
  Pinterest: 'Pinterest-preview.svg',
  VSCO: 'VSCO-preview.svg',
  Cameo: 'Cameo-preview.svg',
  Website: 'website-preview.svg',
  CustomLink: 'custom-link-preview.svg',
}

// Component that renders the SVG icon
export const PlatformIcon: React.FC<{ iconName: string } & IconProps> = ({ iconName, className }) => {
  const fileName = iconFileMap[iconName] || 'custom-link-preview.svg'
  
  return (
    <img
      src={`/icons/${fileName}`}
      alt={iconName}
      className={className}
    />
  )
}

// Legacy function for compatibility
export const getPlatformIcon = (iconName: string) => {
  return ({ className }: IconProps) => <PlatformIcon iconName={iconName} className={className} />
}

