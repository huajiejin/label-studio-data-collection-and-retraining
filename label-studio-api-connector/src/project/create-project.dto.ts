import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  label_config?: string;

  @ApiProperty()
  expert_instruction?: string;

  @ApiProperty()
  show_instruction?: boolean;

  @ApiProperty()
  show_skip_button?: boolean;

  @ApiProperty()
  enable_empty_annotation?: boolean;

  @ApiProperty()
  show_annotation_history?: boolean;

  @ApiProperty()
  organization?: number;

  @ApiProperty()
  color?: string;

  @ApiProperty()
  maximum_annotations?: number;

  @ApiProperty()
  is_published?: boolean;

  @ApiProperty()
  model_version?: string;

  @ApiProperty()
  is_draft?: boolean;

  @ApiProperty()
  created_by?: { id: number, first_name: string, last_name: string, email: string };

  @ApiProperty()
  min_annotations_to_start_training?: number;

  @ApiProperty()
  show_collab_predictions?: boolean;

  @ApiProperty()
  sampling?: string;

  @ApiProperty()
  show_ground_truth_first?: boolean;

  @ApiProperty()
  show_overlap_first?: boolean;

  @ApiProperty()
  overlap_cohort_percentage?: number;

  @ApiProperty()
  task_data_login?: string;

  @ApiProperty()
  task_data_password?: string;

  @ApiProperty()
  control_weights?: object;

  @ApiProperty()
  evaluate_predictions_automatically?: boolean;

  @ApiProperty()
  skip_queue?: "REQUEUE_FOR_ME" | "REQUEUE_FOR_OTHERS" | "IGNORE_SKIPPED";

  @ApiProperty()
  reveal_preannotations_interactively?: boolean;

  @ApiProperty()
  pinned_at?: string;
}
