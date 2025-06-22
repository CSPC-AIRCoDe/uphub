export type Banner = {
	id: string;
	type: string;
	title?: string;
	content: string;
	url?: string;
	dismissible?: boolean;
	timestamp: number;
};

export enum TTS_RESPONSE_SPLIT {
	PUNCTUATION = 'punctuation',
	PARAGRAPHS = 'paragraphs',
	NONE = 'none'
}

export interface UserPermissionChatControls {
	controls?: boolean;
	system_prompt?: boolean;
	file_upload?: boolean;
	delete?: boolean;
	edit?: boolean;
	share?: boolean;
	export?: boolean;
	stt?: boolean;
	tts?: boolean;
	call?: boolean;
	multiple_models?: boolean;
	temporary?: boolean;
	temporary_enforced?: boolean;
}

export interface UserPermissions {
	chat?: UserPermissionChatControls;
	workspace?: {
		models?: boolean;
		knowledge?: boolean;
		prompts?: boolean;
		tools?: boolean;
	};
	sharing?: {
		public_models?: boolean;
		public_knowledge?: boolean;
		public_prompts?: boolean;
		public_tools?: boolean;
	};
	features?: {
		direct_tool_servers?: boolean;
		web_search?: boolean;
		image_generation?: boolean;
		code_interpreter?: boolean;
		notes?: boolean;
	};
}

export interface SessionUser {
	id: string;
	name: string;
	email: string;
	role: string;
	profile_image_url: string;
	token?: string;
	token_type?: string;
	expires_at?: number;
	permissions?: UserPermissions;
}

export interface Settings {
	stylizedPdfExport?: boolean;
	[key: string]: any;
}
