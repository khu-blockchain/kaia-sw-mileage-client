import type { MILEAGE_STATUS, TRANSACTION_STATUS } from "../enum";
import type { MileagePointHistory } from "../mileage-point-history";
import type { Student } from "../student";

type Mileage = {
	id: number;
	mileage_category_name: string;
	mileage_activity_name: string;
	mileage_description: string;
	admin_comment: string | null;
	doc_index: number | null;
	doc_hash: string | null;
	status: MILEAGE_STATUS;
	transaction_status: TRANSACTION_STATUS;
	created_at: string;
	updated_at: string;
	student?: Student;
	mileage_files?: MileageFile[];
	mileage_point_histories?: MileagePointHistory[];
};

type MileageFile = {
	id: number;
	mileage_id: number;
	original_file_name: string;
	stored_file_name: string;
	url: string;
	created_at: string;
	updated_at: string;
};

export type { Mileage, MileageFile };
