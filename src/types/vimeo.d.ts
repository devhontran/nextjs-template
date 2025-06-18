interface VimeoVideo {
  uri: string;
  name: string;
  description: string | null;
  type: string;
  link: string;
  player_embed_url: string;
  duration: number;
  width: number;
  height: number;
  language: string;
  embed: Embed;
  created_time: string;
  modified_time: string;
  release_time: string;
  content_rating: string[];
  content_rating_class: string;
  rating_mod_locked: boolean;
  license: string | null;
  privacy: Privacy;
  pictures: Pictures;
  tags: string[];
  stats: Stats;
  categories: string[];
  uploader: Uploader;
  metadata: Metadata;
  manage_link: string;
  user: User;
  last_user_action_event_date: string;
  parent_folder: ParentFolder;
  review_page: ReviewPage;
  files: VideoFile[];
  download: Download[];
  app: App;
  play: Play;
  status: string;
  resource_key: string;
  upload: Upload;
  transcode: Transcode;
  is_playable: boolean;
  has_audio: boolean;
}

interface Embed {
  html: string;
  badges: Badges;
  interactive: boolean;
  buttons: Buttons;
  logos: Logos;
  play_button: PlayButton;
  title: Title;
  end_screen: string[];
  playbar: boolean;
  quality_selector: string | null;
  pip: boolean;
  autopip: boolean;
  volume: boolean;
  color: string;
  colors: Colors;
  event_schedule: boolean;
  has_cards: boolean;
  outro_type: string;
  show_timezone: boolean;
  cards: string[];
  airplay: boolean;
  audio_tracks: boolean;
  chapters: boolean;
  chromecast: boolean;
  closed_captions: boolean;
  transcript: boolean;
  ask_ai: boolean;
  uri: string | null;
  email_capture_form: string | null;
  speed: boolean;
}

interface Badges {
  hdr: boolean;
  live: Live;
  staff_pick: StaffPick;
  vod: boolean;
  weekend_challenge: boolean;
}

interface Live {
  streaming: boolean;
  archived: boolean;
}

interface StaffPick {
  normal: boolean;
  best_of_the_month: boolean;
  best_of_the_year: boolean;
  premiere: boolean;
}

interface Buttons {
  watchlater: boolean;
  share: boolean;
  embed: boolean;
  hd: boolean;
  fullscreen: boolean;
  scaling: boolean;
  like: boolean;
}

interface Logos {
  vimeo: boolean;
  custom: CustomLogo;
}

interface CustomLogo {
  active: boolean;
  url: string | null;
  link: string | null;
  use_link: boolean;
  sticky: boolean;
}

interface PlayButton {
  position: string;
}

interface Title {
  name: string;
  owner: string;
  portrait: string;
}

interface Colors {
  color_one: string;
  color_two: string;
  color_three: string;
  color_four: string;
}

interface Privacy {
  view: string;
  embed: string;
  download: boolean;
  add: boolean;
  comments: string;
}

interface Pictures {
  uri: string;
  active: boolean;
  type: string;
  base_link: string;
  sizes: PictureSize[];
  resource_key: string;
  default_picture: boolean;
}

interface PictureSize {
  width: number;
  height: number;
  link: string;
  link_with_play_button: string;
}

interface Stats {
  plays: number;
}

interface Uploader {
  pictures: Pictures;
}

interface Metadata {
  connections: Connections;
  interactions: Interactions;
  is_vimeo_create: boolean;
  is_screen_record: boolean;
}

interface Connections {
  comments: Connection;
  credits: Connection;
  likes: Connection;
  pictures: Connection;
  texttracks: Connection;
  related: Connection | null;
  recommendations: Connection;
  albums: Connection;
  available_albums: Connection;
  available_channels: Connection;
  versions: Versions;
}

interface Connection {
  uri: string;
  options: string[];
  total?: number;
  resource_signature?: string;
}

type Versions = Connection & {
  current_uri: string;
  resource_key: string;
  latest_incomplete_version: string | null;
};

interface Interactions {
  watchlater: Watchlater;
  report: Report;
  view_team_members: Interaction;
  edit: Interaction;
  edit_content_rating: EditContentRating;
  edit_privacy: EditPrivacy;
  delete: Interaction;
  can_update_privacy_to_public: Interaction;
  invite: Interaction;
  trim: Interaction;
  validate: Interaction;
}

interface Interaction {
  uri: string;
  options: string[];
}

type Watchlater = Interaction & {
  added: boolean;
  added_time: string | null;
};

type Report = Interaction & {
  reason: string[];
};

type EditContentRating = Interaction & {
  content_rating: string[];
};

type EditPrivacy = Interaction & {
  content_type: string;
  properties: PrivacyProperty[];
};

interface PrivacyProperty {
  name: string;
  required: boolean;
  options: string[];
}

interface ParentFolder {
  created_time: string;
  modified_time: string;
  last_user_action_event_date: string;
  name: string;
  privacy: FolderPrivacy;
  resource_key: string;
  uri: string;
  link: string;
  manage_link: string;
  pinned_on: string | null;
  is_pinned: boolean;
  is_private_to_user: boolean;
  user: User;
  access_grant: string | null;
  metadata: FolderMetadata;
}

interface FolderPrivacy {
  view: string;
}

interface FolderMetadata {
  connections: FolderConnections;
  interactions: FolderInteractions;
}

interface FolderConnections {
  items: Connection;
  videos: Connection;
  folders: Connection;
  ancestor_path: string[];
}

interface FolderInteractions {
  edit: Interaction;
  move_video: Interaction;
  upload_video: Interaction;
  view: Interaction;
  invite: Interaction;
  edit_settings: Interaction;
  delete: Interaction;
  delete_video: Interaction;
  add_subfolder: AddSubfolder;
}

type AddSubfolder = Interaction & {
  can_add_subfolders: boolean;
  subfolder_depth_limit_reached: boolean;
  content_type: string;
  properties: SubfolderProperty[];
};

interface SubfolderProperty {
  name: string;
  required: boolean;
  value: string;
}

interface ReviewPage {
  active: boolean;
  link: string;
  is_shareable: boolean;
}

interface VideoFile {
  quality: string;
  rendition: string;
  type: string;
  width: number;
  height: number;
  link: string;
  created_time: string;
  fps: number;
  size: number;
  md5: string | null;
  public_name: string;
  size_short: string;
}

type Download = VideoFile & {
  expires: string;
};

interface App {
  name: string;
  uri: string;
}

interface Play {
  progressive: Progressive[];
  hls: Hls;
  dash: Dash;
  status: string;
}

interface Progressive {
  type: string;
  codec: string;
  width: number;
  height: number;
  link_expiration_time: string;
  link: string;
  created_time: string;
  fps: number;
  size: number;
  md5: string | null;
  rendition: string;
}

interface Hls {
  link_expiration_time: string;
  link: string;
}

interface Dash {
  link_expiration_time: string;
  link: string;
}

interface Upload {
  status: string;
  link: string | null;
  upload_link: string | null;
  form: string | null;
  approach: string | null;
  size: number | null;
  redirect_url: string | null;
}

interface Transcode {
  status: string;
}

interface User {
  uri: string;
  name: string;
  link: string;
  capabilities: Capabilities;
  location: string;
  gender: string;
  bio: string | null;
  short_bio: string | null;
  created_time: string;
  pictures: Pictures;
  websites: string[];
  metadata: UserMetadata;
  location_details: LocationDetails;
  skills: string[];
  available_for_hire: boolean;
  can_work_remotely: boolean;
  preferences: UserPreferences;
  content_filter: string[];
  resource_key: string;
  account: string;
}

interface Capabilities {
  hasLiveSubscription: boolean;
  hasEnterpriseLihp: boolean;
  hasSvvTimecodedComments: boolean;
  hasSimplifiedEnterpriseAccount: boolean;
}

interface UserMetadata {
  connections: UserConnections;
}

interface UserConnections {
  albums: Connection;
  appearances: Connection;
  categories: Connection;
  channels: Connection;
  feed: Connection;
  followers: Connection;
  following: Connection;
  groups: Connection;
  likes: Connection;
  membership: Connection;
  moderated_channels: Connection;
  portfolios: Connection;
  videos: Connection;
  watchlater: Connection;
  shared: Connection;
  pictures: Connection;
  watched_videos: Connection;
  folders_root: Connection;
  folders: Connection;
  teams: Connection;
  permission_policies: Connection;
  block: Connection;
}

interface LocationDetails {
  formatted_address: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  state: string | null;
  neighborhood: string | null;
  sub_locality: string | null;
  state_iso_code: string | null;
  country: string | null;
  country_iso_code: string | null;
}

interface UserPreferences {
  videos: VideoPreferences;
  webinar_registrant_lower_watermark_banner_dismissed: string[];
}

interface VideoPreferences {
  rating: string[];
  privacy: Privacy;
}

interface SimpleVimeo {
  pictures: VimeoVideo['pictures'];
  width: VimeoVideo['width'];
  height: VimeoVideo['height'];
  play: VimeoVideo['play'];
}
