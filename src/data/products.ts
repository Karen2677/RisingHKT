export interface Product {
  id: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  detailsZh: string;
  detailsEn: string;
  imageUrl: string;
  features?: {
    zh: string[];
    en: string[];
  };
  applications?: {
    zh: string[];
    en: string[];
  };
}

const products: Product[] = [
  {
    id: 1,
    titleZh: 'TMS经颅磁刺激系统',
    titleEn: 'TMS Systems',
    descriptionZh: '先进的经颅磁刺激系统，包括TMS、rTMS和pTMS技术，用于神经调控研究和临床研究。',
    descriptionEn: 'Advanced transcranial magnetic stimulation systems, including TMS, rTMS, and pTMS technologies for neuromodulation research and clinical research.',
    detailsZh: '1985年，英国谢菲尔德大学的Anthony Barker教授团队成功研制出世界首台经颅磁刺激器（TMS）。作为该技术的创始机构，英国Magstim公司完整继承了Barker教授的专利技术，现已发展成为全球领先的TMS设备制造商。公司产品线涵盖单脉冲TMS、重复经颅磁刺激（rTMS）、间歇性θ脉冲刺激（iTBS）、斯坦福神经调控范式（SNT）以及配对脉冲经颅磁刺激（pTMS）等多种模式，可满足临床科研的多元化需求。所有设备均配备动态冷却系统，支持长时间稳定运行，并通过多重安全防护机制确保操作安全。',
    detailsEn: 'In 1985, Professor Anthony Barker\'s team at the University of Sheffield, UK, successfully developed the world\'s first transcranial magnetic stimulator (TMS). As the founding institution of this technology, UK\'s Magstim company has fully inherited Professor Barker\'s patent technology and has now developed into a global leading TMS equipment manufacturer. The company\'s product line covers various modes including single-pulse TMS, repetitive TMS (rTMS), intermittent theta burst stimulation (iTBS), Stanford Neuromodulation Therapy (SNT), and paired-pulse TMS (pTMS), meeting diverse clinical research needs. All equipment is equipped with dynamic cooling systems, supporting long-term stable operation, and ensures operational safety through multiple protection mechanisms.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//tms-system.png',
    features: {
      zh: [
        '刺激强度稳定且持续',
        '刺激频率精准',
        '支持各种刺激范式（TMS、ppTMS、rTMS、iTBS、cTBS、SNT）',
        '易学易用的操作界面',
        '提供多达50余种线圈'
      ],
      en: [
        'Stable and continuous stimulation intensity',
        'Precise stimulation frequency',
        'Support for various stimulation paradigms (TMS, ppTMS, rTMS, iTBS, cTBS, SNT)',
        'User-friendly interface',
        'Over 50 types of coils available'
      ]
    },
    applications: {
      zh: [
        '心理学研究',
        '认知神经科学',
        '脑机接口及人工智能研究',
        '神经病学',
        '康复医学',
        '精神病学',
        '疼痛及物质依赖'
      ],
      en: [
        'Psychological research',
        'Cognitive neuroscience',
        'Brain-computer interface and AI research',
        'Neurology research',
        'Rehabilitation medicine research',
        'Psychiatry research',
        'Pain and substance dependence research'
      ]
    }
  },
  {
    id: 2,
    titleZh: '经颅光刺激、光生物调节（tPBM）',
    titleEn: 'Transcranial Photobiomodulation (tPBM)',
    descriptionZh: '创新的经颅光生物调节技术，通过1064 nm近红外光刺激改善脑功能。',
    descriptionEn: 'Innovative transcranial photobiomodulation technology using 1064 nm near-infrared light stimulation to improve brain function.',
    detailsZh: '通过1064 nm的近红外光，刺激大脑表面及深层脑区，改善脑功能、调节神经生理活动，促进神经再生。结合NeuroFUS、TMS等设备，能够在神经调控上形成不同层次的综合干预，最大化提升调控效果。',
    detailsEn: 'Utilizing 1064 nm near-infrared light to stimulate both surface and deep brain regions can enhance brain function, regulate neurophysiological activity, and promote neural regeneration. When combined with devices like NeuroFUS and TMS, it facilitates comprehensive interventions across various levels of neuromodulation, thereby amplifying the overall impact.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//tPBM.jpg',
    features: {
      zh: [
        '1064 nm近红外光刺激',
        '深层脑区调节能力',
        '可与其他设备联合使用',
        '安全无创',
        '精确的剂量控制'
      ],
      en: [
        '1064 nm near-infrared light stimulation',
        'Deep brain region modulation capability',
        'Compatible with other devices',
        'Safe non-invasive',
        'Precise dose control'
      ]
    },
    applications: {
      zh: [
        '神经退行性疾病',
        '脑血管',
        '神经损伤',
        '认知功能',
        '神经系统综合调节'
      ],
      en: [
        'Neurodegenerative diseases',
        'Cerebrovascular disease',
        'Neural injury',
        'Cognitive function',
        'Comprehensive neural system regulation'
      ]
    }
  },
  {
    id: 3,
    titleZh: '经颅电刺激（tES_tDCS_tACS）、聚焦经颅电刺激（TI）',
    titleEn: 'Transcranial Electrical Stimulation (tES/tDCS/tACS) & Targeted Impulse (TI)',
    descriptionZh: '通过低强度电流对大脑进行非侵入性调节，改变大脑皮层的兴奋性。',
    descriptionEn: 'Non-invasive brain modulation through low-intensity electrical current, altering cortical excitability.',
    detailsZh: '经颅直流电刺激（tDCS）与经颅交流电刺激（tECS）都是通过低强度电流对大脑进行非侵入性调节。它能够改变大脑皮层的兴奋性，有助于神经康复、改善认知功能等。与经颅磁刺激器结合能形成有效的神经刺激方案，同时与NeuroFUS结合使用，可以实现神经调控的多样化组合，进一步优化刺激效果。',
    detailsEn: 'Transcranial direct current stimulation (tDCS) and transcranial alternating current stimulation (tACS) are non-invasive techniques that apply low-intensity electrical currents to the brain to modulate neural activity. These methods can alter cortical excitability, aiding in neurorehabilitation and cognitive enhancement. When combined with transcranial magnetic stimulation (TMS), they form effective neuromodulation protocols. Additionally, integrating these techniques with NeuroFUS allows for diversified neuromodulation strategies, further optimizing stimulation outcomes.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//tms-ti.jpg',
    features: {
      zh: [
        '非侵入性神经调节',
        '可调节的刺激参数',
        '多模式组合应用',
        '安全性高',
        '操作简便'
      ],
      en: [
        'Non-invasive neuromodulation',
        'Adjustable stimulation parameters',
        'Multi-modal combination applications',
        'High safety profile',
        'Easy operation'
      ]
    },
    applications: {
      zh: [
        '认知障碍',
        '抑郁症',
        '焦虑症',
        '运动功能',
        '语言功能'
      ],
      en: [
        'Cognitive disorder',
        'Depression',
        'Anxiety',
        'Motor function',
        'Language function'
      ]
    }
  },
  {
    id: 4,
    titleZh: '低强度聚焦经颅超声刺激器（TUS）',
    titleEn: 'Low-Intensity Focused Transcranial Ultrasound Stimulation (TUS)',
    descriptionZh: '通过定向声波实现深层脑区的非侵入性神经调控。',
    descriptionEn: 'Non-invasive neuromodulation of deep brain regions through focused ultrasound waves.',
    detailsZh: '低强度聚焦经颅超声技术通过定向的声波刺激大脑深层区域，可以在非侵入性条件下实现神经调控。其具有高精度、可控性强、对脑组织无损伤等特点。结合fMRI的应用，可以为脑研究提供精准的脑区激活图谱，为后续的脑疾病诊断和治疗方案的优化提供科学依据。',
    detailsEn: 'Low-intensity focused transcranial ultrasound technology utilizes targeted acoustic waves to stimulate deep brain regions non-invasively, enabling precise neuromodulation. This technique offers high spatial precision, strong controllability, and no impact on surrounding brain tissue. When combined with functional magnetic resonance imaging (fMRI), it provides accurate brain activation maps, offering scientific evidence for the diagnosis of neurological diseases and the optimization of treatment strategies.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//tus-system.png',
    features: {
      zh: [
        '高精度定向刺激',
        '深层脑区可达性',
        'fMRI兼容性',
        '可控性强',
        '损伤风险低'
      ],
      en: [
        'High-precision targeted stimulation',
        'Deep brain region accessibility',
        'fMRI compatibility',
        'Strong controllability',
        'Low risk of tissue damage'
      ]
    },
    applications: {
      zh: [
        '神经康复',
        '疼痛管理',
        '帕金森病',
        '抑郁症',
        '脑科学基础研究'
      ],
      en: [
        'Neurorehabilitation',
        'Pain management',
        'Parkinson\'s disease',
        'Depression',
        'Basic brain science research'
      ]
    }
  },
  {
    id: 5,
    titleZh: '冷热痛觉刺激器（QST）',
    titleEn: 'Quantitative Sensory Testing (QST) System',
    descriptionZh: '精确控制的冷热刺激系统，用于神经病理学研究和痛觉评估。',
    descriptionEn: 'Precisely controlled thermal stimulation system for neuropathology research and pain assessment.',
    detailsZh: '冷热刺激功能：该设备可提供精确控制的冷热刺激，适用于多种神经病理学研究。通过可调节的温度设置，能够对受试者施加不同强度的热、冷刺激，模拟真实的生理痛觉反应。多模态结合可以实现多模式的脑神经调控，既可以通过低强度聚焦超声进行深层脑部调控，又能通过冷热刺激进行痛觉相关的外部刺激，进而研究大脑对疼痛的响应机制。与功能磁共振兼容的TMS系统结合：在进行疼痛刺激的同时，结合fMRI和TMS，可以同步监测疼痛刺激对大脑活动的影响，从而获得更全面的神经机制数据。',
    detailsEn: 'Thermal stimulation functionality: This device provides precisely controlled thermal stimulation suitable for various neuropathological studies. Through adjustable temperature settings, it can apply different intensities of heat and cold stimuli to subjects, simulating real physiological pain responses. Multi-modal integration enables comprehensive neuromodulation, combining low-intensity focused ultrasound for deep brain modulation with thermal stimulation for pain-related external stimuli, facilitating research on brain pain response mechanisms. Integration with fMRI-compatible TMS systems allows simultaneous monitoring of pain stimulation effects on brain activity, providing comprehensive neural mechanism data.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//QST.png',
    features: {
      zh: [
        '精确温度控制',
        '多模态集成能力',
        'fMRI兼容性',
        '实时数据监测',
        '可调节刺激强度'
      ],
      en: [
        'Precise temperature control',
        'Multi-modal integration capability',
        'fMRI compatibility',
        'Real-time data monitoring',
        'Adjustable stimulation intensity'
      ]
    },
    applications: {
      zh: [
        '神经疼痛研究',
        '痛觉感知评估',
        '神经系统疾病',
        '定量感觉评估',
        '临床治疗效果评估'
      ],
      en: [
        'Neuropathic pain research',
        'Pain perception',
        'Neurological disease',
        'Quantitative sensory testing',
        'Clinical treatment evaluation'
      ]
    }
  },
  {
    id: 6,
    titleZh: '机器人导航的经颅磁刺激系统（rTMS, Robotic navigated）',
    titleEn: 'Robotic Navigated Transcranial Magnetic Stimulation (rTMS)',
    descriptionZh: '结合机器人导航技术的精准经颅磁刺激系统。',
    descriptionEn: 'Precise transcranial magnetic stimulation system integrated with robotic navigation technology.',
    detailsZh: '该系统可进行精准的经颅磁刺激（TMS），配合机器人导航技术，可以在个体化大脑图谱的基础上实现精准定位。提供不同频率、强度的刺激模式，有效调节大脑的神经活动。可以提供多模态神经调控方案，而结合fMRI可以同步观察TMS对大脑不同区域的作用效果，提升脑机接口技术的准确性和临床适应性。',
    detailsEn: 'This system enables precise transcranial magnetic stimulation (TMS) with robotic navigation technology, achieving accurate targeting based on individualized brain mapping. It offers stimulation modes of varying frequencies and intensities for effective neural activity modulation. The system provides multi-modal neuromodulation solutions, and when combined with fMRI, allows simultaneous observation of TMS effects on different brain regions, enhancing the accuracy and clinical adaptability of brain-computer interface technology.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//Robot.png',
    features: {
      zh: [
        '机器人精准导航',
        '个体化脑图谱定位',
        '多频率刺激模式',
        'fMRI同步兼容',
        '实时效果监测'
      ],
      en: [
        'Robotic precision navigation',
        'Individualized brain mapping',
        'Multi-frequency stimulation modes',
        'fMRI synchronization compatibility',
        'Real-time effect monitoring'
      ]
    },
    applications: {
      zh: [
        '精神疾病',
        '神经康复',
        '脑功能研究',
        '脑机接口开发',
        '个性化方案制定'
      ],
      en: [
        'Mental illness',
        'Neurorehabilitation',
        'Brain function research',
        'Brain-computer interface development',
        'Personalized planning'
      ]
    }
  },
  {
    id: 7,
    titleZh: '功能磁共振同步经颅磁刺激(fMRI-TMS)',
    titleEn: 'Functional MRI-Synchronized TMS (fMRI-TMS)',
    descriptionZh: '结合fMRI空间定位和TMS时间效应的前沿神经调控技术。',
    descriptionEn: 'Advanced neuromodulation technology combining fMRI spatial localization with TMS temporal effects.',
    detailsZh: 'fMRI-TMS是一项国际前沿新技术。通过利用fMRI的空间定位和TMS的时间效应结合，借助fMRI实时观测磁刺激的激活反应，深入研究脑网络及脑功能连接、揭示经颅磁刺激的脑调控成效机理，真正实现基于循证医学的经颅磁刺激应用。并能够实现个体化靶向精准刺激，从而最终实现临床研究的重大突破。',
    detailsEn: 'fMRI-TMS is a cutting-edge international technology. By combining fMRI spatial localization and TMS temporal effects, it enables real-time observation of magnetic stimulation activation responses through fMRI, facilitating in-depth study of brain networks and functional connectivity, revealing the mechanisms of transcranial magnetic stimulation\'s neuromodulatory effects, and achieving evidence-based TMS applications. It enables individualized targeted precise stimulation, ultimately achieving breakthrough clinical research.',
    imageUrl: 'https://dxtdryilaoahkcazxyuu.supabase.co/storage/v1/object/public/product-images//MRI.png',
    features: {
      zh: [
        '实时脑活动监测',
        '精准空间定位',
        '个体化方案',
        '循证医学支持',
        '高时空分辨率'
      ],
      en: [
        'Real-time brain activity monitoring',
        'Precise spatial localization',
        'Individualized planning',
        'Evidence-based medical support',
        'High spatiotemporal resolution'
      ]
    },
    applications: {
      zh: [
        '脑网络研究',
        '功能连接分析',
        '个体化脑刺激方案优化',
        '临床疗效评估',
        '神经科学研究'
      ],
      en: [
        'Brain network research',
        'Functional connectivity analysis',
        'Personalized brain stimulation protocol optimization',
        'Clinical efficacy evaluation',
        'Neuroscience research'
      ]
    }
  }
];

export default products;